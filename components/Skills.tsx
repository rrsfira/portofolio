"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SectionTitle } from "@/components/SectionTitle";
import { skills } from "@/lib/data";

const skillRows = [skills.slice(0, 5), skills.slice(5, 9), skills.slice(9)];

const skillCategories: Record<string, string> = {
  "React.js": "Frontend Library",
  JavaScript: "Programming Language",
  HTML: "Markup Language",
  CSS: "Styling Language",
  "Tailwind CSS": "CSS Framework",
  Git: "Version Control",
  GitHub: "Version Control",
  Figma: "UI/UX Design",
  "REST API": "Web Services",
  Vite: "Build Tool",
  MySQL: "Database",
  PHP: "Backend Language",
};

type SkillKeyProps = {
  skill: (typeof skills)[number];
  skillIndex: number;
  typingIndex: number | null;
  selectedIndex: number | null;
  onSelect: (skillIndex: number) => void;
};

function SkillKey({ skill, skillIndex, typingIndex, selectedIndex, onSelect }: SkillKeyProps) {
  const Icon = skill.icon;
  const isTyping = typingIndex === skillIndex;
  const isSelected = selectedIndex === skillIndex;

  return (
    <motion.button
      type="button"
      aria-label={skill.name}
      className="skill-key focus-ring"
      style={{ "--key-accent": skill.accent } as CSSProperties}
      aria-pressed={isSelected}
      onClick={() => onSelect(skillIndex)}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      animate={{ y: isTyping ? 5 : 0 }}
      whileHover={{ y: -2 }}
      whileTap={{ y: 4 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        y: { type: "spring", stiffness: 500, damping: 25 },
        opacity: { delay: skillIndex * 0.04, duration: 0.3 },
      }}
    >
      <span className="skill-key__surface">
        <span className="skill-key__switch" aria-hidden="true" />
        <Icon aria-hidden="true" className="skill-key__icon" strokeWidth={1.8} />
      </span>
      <span className={`skill-key__tooltip${isSelected ? " skill-key__tooltip--selected" : ""}`} role="tooltip">
        <strong>{skill.name}</strong>
        <small>{skillCategories[skill.name]}</small>
      </span>
    </motion.button>
  );
}

function SkillKeyboard() {
  const keyboardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(keyboardRef, { once: true, amount: 0.35 });
  const [typingIndex, setTypingIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!isInView) return;

    const sequence = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const timers = sequence.map((skillIndex, sequenceIndex) =>
      window.setTimeout(() => setTypingIndex(skillIndex), 520 + sequenceIndex * 145),
    );
    const finish = window.setTimeout(() => setTypingIndex(null), 520 + sequence.length * 145 + 240);

    return () => {
      timers.forEach(window.clearTimeout);
      window.clearTimeout(finish);
    };
  }, [isInView]);

  return (
    <div
      ref={keyboardRef}
      className="skill-keyboard"
      aria-label="Interactive mechanical keyboard of development skills"
    >
      <p className="skill-keyboard__hint">Tools and technologies I use to build digital experiences.</p>
      <div className="skill-keyboard__base">
        {skillRows.map((row, rowIndex) => (
          <div className={`skill-keyboard__row skill-keyboard__row--${rowIndex + 1}`} key={rowIndex}>
            {row.map((skill) => {
              const skillIndex = skills.indexOf(skill);
              return (
              <SkillKey
                key={skills[skillIndex].name}
                skill={skills[skillIndex]}
                skillIndex={skillIndex}
                typingIndex={typingIndex}
                selectedIndex={selectedIndex}
                onSelect={(index) => setSelectedIndex((current) => current === index ? null : index)}
              />
              );
            })}
          </div>
        ))}
      </div>
      <div className="skill-keyboard__status" aria-hidden="true">
        <span className="skill-keyboard__status-dot" />
        <span>interactive skill keys</span>
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="section-shell py-16 sm:py-20 lg:py-24">
      <SectionTitle eyebrow="Skills" title="Skills" />
      <SkillKeyboard />
    </section>
  );
}
