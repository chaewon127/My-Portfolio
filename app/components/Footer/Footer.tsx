"use client";

import React from "react";
import Image from "next/image";

interface SocialLink {
  name: string;
  url: string;
  icon?: string;
}

const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com",
  },
  {
    name: "Email",
    url: "mailto:example@email.com",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const stones = Array.from({ length: 28 }).map((_, i) => ({
    id: i,
    size: (i % 5) + 3,
    left: (i * 13) % 100,
    bottom: (i * 7) % 25,
    opacity: 0.6 + (i % 3) * 0.1,
  }));

  return (
    <footer className="w-full relative py-8 px-4 overflow-hidden">
      {/* 모래바닥 배경 */}
      <div className="absolute inset-0 pointer-events-none footer-sand-gradient" />
      {/* 모래 텍스처 */}
      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 2px 2px, var(--sand-grain) 1.2px, transparent 0),
            radial-gradient(circle at 8px 6px, var(--sand-grain) 1.4px, transparent 0)
          `,
          backgroundSize: "22px 22px, 28px 28px",
        }}
      />
      {/* 작은 돌멩이들 */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none animate-sand-wiggle">
        {stones.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full"
            style={{
              width: `${s.size}px`,
              height: `${s.size}px`,
              left: `${s.left}%`,
              bottom: `${s.bottom}px`,
              backgroundColor: "var(--sand-stone)",
              opacity: s.opacity,
              boxShadow: `0 1px 2px rgba(0, 0, 0, 0.35)`,
              filter: `blur(${(s.size - 2) * 0.3}px)`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[var(--text-secondary)] text-sm">
            © {currentYear} Portfolio. All rights reserved.
          </div>
          <div className="flex gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target={link.url.startsWith("mailto:") ? undefined : "_blank"}
                rel={
                  link.url.startsWith("mailto:")
                    ? undefined
                    : "noopener noreferrer"
                }
                className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
