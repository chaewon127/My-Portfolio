"use client";

import { useState } from "react";
import SkillChip from "./SkillChip";

interface Skill {
  icon: string;
  text: string;
  level?: string;
}

interface TickerRowProps {
  skills: Skill[];
  speed?: number;
  reverse?: boolean;
}

export default function TickerRow({
  skills,
  speed = 30,
  reverse = false,
}: TickerRowProps) {
  const [isPaused, setIsPaused] = useState(false);

  // skills 배열을 여러 번 복제하여 무한 스크롤 효과
  const duplicatedSkills = [...skills, ...skills, ...skills, ...skills];

  return (
    <div
      className="overflow-hidden py-3"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className={`flex gap-4 w-max ${
          reverse ? "animate-ticker-r" : "animate-ticker-l"
        }`}
        style={{
          animationDuration: `${speed}s`,
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {duplicatedSkills.map((skill, i) => (
          <SkillChip
            key={`${skill.text}-${i}`}
            icon={skill.icon}
            text={skill.text}
            level={skill.level}
          />
        ))}
      </div>
    </div>
  );
}

