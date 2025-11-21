"use client";

import Image from "next/image";
import { useTheme } from "../../contexts/ThemeContext";

interface SkillChipProps {
  icon: string;
  text: string;
  level?: string;
}

export default function SkillChip({ icon, text, level }: SkillChipProps) {
  const { theme } = useTheme();

  return (
    <div className="flex items-center gap-3 px-5 py-2 mx-2 min-w-max rounded-lg border-[var(--border)] border bg-[var(--border)]/30 text-[var(--text-primary)] whitespace-nowrap hover:bg-[var(--border)]/50 transition-colors">
      <div
        className={`w-5 h-5 relative ${
          theme === "dark" ? "brightness-0 invert" : ""
        }`}
      >
        <Image
          src={icon}
          alt={text}
          width={20}
          height={20}
          className="object-contain"
        />
      </div>
      <span>{text}</span>
    </div>
  );
}
