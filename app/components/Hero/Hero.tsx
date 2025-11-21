"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const roles = ["Full Stack Developer", "AI Engineer", "Database Administrator"];

export default function Hero() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[index];
    const speed = isDeleting ? 50 : 120;

    const handler = setTimeout(() => {
      setText((prev) => {
        if (!isDeleting) {
          // 타이핑
          const next = current.slice(0, prev.length + 1);
          if (next === current) {
            setTimeout(() => setIsDeleting(true), 800);
          }
          return next;
        } else {
          // 지우기
          const next = current.slice(0, prev.length - 1);
          if (next.length === 0) {
            setIsDeleting(false);
            setIndex((prev) => (prev + 1) % roles.length);
          }
          return next;
        }
      });
    }, speed);

    return () => clearTimeout(handler);
  }, [text, isDeleting, index]);

  return (
    <section
      id="hero"
      className="flex flex-col w-full min-h-screen items-center justify-center px-4 py-20"
    >
      <div className="max-w-4xl w-full">
        <p className="text-[var(--text-primary)] text-3xl md:text-4xl font-bold mb-4">
          Hi, I&rsquo;m-
        </p>
        <div className="flex h-12 md:h-16 items-center mb-6 text-[var(--text-primary)] text-3xl md:text-4xl font-bold">
          <span className="mr-3">{text}</span>
          <span className="inline-block w-1 h-8 md:h-10 rounded-full bg-[var(--text-primary)] animate-cursor"></span>
        </div>
        <button className="flex gap-2 items-center w-fit bg-[var(--accent)] text-white border-none rounded-lg px-6 py-3 mb-5 hover:bg-[var(--accent)]/80 transition-colors">
          <Image
            src="/file.svg"
            alt="file"
            width={20}
            height={20}
            className=""
          />
          Resume
        </button>
      </div>
    </section>
  );
}
