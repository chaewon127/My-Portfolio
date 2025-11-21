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

  return (
    <footer className="w-full relative py-8 px-4 overflow-hidden">
      {/* 모래바닥 배경 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-900/10 to-amber-800/30 dark:via-amber-900/20 dark:to-amber-800/40">
        {/* 모래 텍스처 */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #d97706 1px, transparent 0)`,
            backgroundSize: "20px 20px",
          }}
        />
        {/* 작은 돌멩이들 */}
        <div className="absolute bottom-0 left-0 right-0 h-16">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-amber-700/30 dark:bg-amber-600/40"
              style={{
                width: `${Math.random() * 8 + 4}px`,
                height: `${Math.random() * 8 + 4}px`,
                left: `${Math.random() * 100}%`,
                bottom: `${Math.random() * 20}px`,
              }}
            />
          ))}
        </div>
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
