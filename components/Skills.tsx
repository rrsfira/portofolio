"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
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

const skillDescriptions: Record<string, string> = {
  "React.js": "A component-based library for building fast, interactive interfaces.",
  JavaScript: "The programming language that powers interactive behavior across the web.",
  HTML: "The semantic markup foundation for accessible, structured web pages.",
  CSS: "The styling language used to shape responsive layouts and visual systems.",
  "Tailwind CSS": "A utility-first CSS framework for composing responsive interfaces quickly.",
  Git: "A version control system for tracking changes and collaborating safely.",
  GitHub: "A platform for hosting repositories, reviewing code, and working with teams.",
  Figma: "A collaborative design tool for exploring and communicating interface ideas.",
  "REST API": "A practical way for applications to exchange resources over HTTP.",
  Vite: "A fast frontend build tool with an efficient development workflow.",
  MySQL: "A relational database for storing and querying structured application data.",
  PHP: "A server-side language used to build dynamic web applications and services.",
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
        <span className="skill-key__mount" aria-hidden="true" />
        <span className="skill-key__side" aria-hidden="true" />
        <span className="skill-key__bevel" aria-hidden="true" />
        <span className="skill-key__top">
          <Icon aria-hidden="true" className="skill-key__icon" strokeWidth={1.8} />
        </span>
      </span>
      <span className={`skill-key__tooltip${isSelected ? " skill-key__tooltip--selected" : ""}`} role="tooltip">
        <strong>{skill.name}</strong>
        <small>{skillCategories[skill.name]}</small>
      </span>
      <AnimatePresence>
        {isSelected ? (
          <motion.span
            className="skill-key__detail-bubble"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            role="status"
          >
            <strong>{skill.name}</strong>
            <small>{skillCategories[skill.name]}</small>
            <span>{skillDescriptions[skill.name]}</span>
          </motion.span>
        ) : null}
      </AnimatePresence>
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
      <div className="skill-keyboard__viewport">
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
    <section id="skills" className="section-shell skills-section py-16 sm:py-20 lg:py-24">
      <SectionTitle eyebrow="Skills" title="Skills" />
      <SkillKeyboard />
    </section>
  );
}
