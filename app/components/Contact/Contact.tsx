"use client";

import React from "react";
import Image from "next/image";
import { useTheme } from "../../contexts/ThemeContext";

interface ContactLink {
  name: string;
  url: string;
  icon?: string;
}

const contactLinks: ContactLink[] = [
  {
    name: "GitHub",
    url: "https://github.com",
    icon: "/github.svg",
  },
  {
    name: "Email",
    url: "mailto:example@email.com",
    icon: "/email.svg",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com",
    icon: "/linkedin.svg",
  },
];

export default function Contact() {
  const { theme } = useTheme();

  return (
    <section
      id="contact"
      className="w-full min-h-screen flex items-center justify-center px-4 py-20"
    >
      <div className="max-w-4xl w-full">
        <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-12 text-center">
          Contact
        </h2>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          {contactLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target={link.url.startsWith("mailto:") ? undefined : "_blank"}
              rel={
                link.url.startsWith("mailto:")
                  ? undefined
                  : "noopener noreferrer"
              }
              className="flex items-center gap-3 px-6 py-4 rounded-lg bg-[var(--border)]/50 hover:bg-[var(--border)] border border-[var(--border)] hover:border-[var(--accent)] transition-all hover:scale-105"
            >
              {link.icon && (
                <div
                  className={`w-6 h-6 relative ${
                    theme === "dark" ? "brightness-0 invert" : ""
                  }`}
                >
                  <Image
                    src={link.icon}
                    alt={link.name}
                    width={24}
                    height={24}
                    className="w-6 h-6 object-contain"
                  />
                </div>
              )}
              <span className="text-[var(--text-primary)] font-semibold">
                {link.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
