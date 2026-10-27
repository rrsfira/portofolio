
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionTitle } from "@/components/SectionTitle";
import { skills } from "@/lib/data";
import { SkillRubiksCube } from "@/components/SkillRubiksCube";

const skillCategories: Record<string, string> = {
  "React.js": "Frontend Library",
  JavaScript: "Programming Language",
  TypeScript: "Programming Language",
  HTML: "Markup Language",
  CSS: "Styling Language",
  "Tailwind CSS": "CSS Framework",
  Git: "Version Control",
  GitHub: "Code Hosting",
  "Next.js": "React Framework",
  Figma: "UI/UX Design",
  "REST API": "Web Services",
  Vite: "Build Tool",
  MySQL: "Database",
  PHP: "Backend Language",
  Docker: "Container Platform",
};

const skillDescriptions: Record<string, string> = {
  "React.js":
    "A component-based library for building interactive user interfaces.",
  JavaScript:
    "The programming language behind interactive behavior on the web.",
  TypeScript:
    "Adds static typing to JavaScript for more reliable applications.",
  HTML:
    "Defines the structure and semantic content of web pages.",
  CSS:
    "Creates layouts, responsive interfaces, and visual styling.",
  "Tailwind CSS":
    "A utility-first CSS framework for building custom interfaces.",
  Git:
    "Tracks code changes and supports collaborative development.",
  GitHub:
    "Hosts repositories and supports code review and collaboration.",
  "Next.js":
    "A React framework for full-stack web applications.",
  Figma:
    "A collaborative tool for interface design and prototyping.",
  "REST API":
    "Enables applications to exchange resources over HTTP.",
  Vite:
    "Provides a fast development server and frontend build tooling.",
  MySQL:
    "Stores and queries structured data in a relational database.",
  PHP:
    "A server-side language for dynamic websites and web applications.",
  Docker:
    "Packages applications and dependencies into portable containers.",
};

export function Skills() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedSkill =
    selectedIndex === null ? null : skills[selectedIndex];

  function handleSelect(index: number) {
    setSelectedIndex((current) => (current === index ? null : index));
  }

  return (
    <section
      id="skills"
      className="section-shell skills-section py-16 sm:py-20 lg:py-24"
    >
      <SectionTitle eyebrow="Skills" title="Skills" />

      <div className="skill-rubiks-section">
        <p className="skill-rubiks__hint">
          One face at a time: 9 skills built, 3 more to explore, and always
          room to grow.
        </p>

        <SkillRubiksCube
          selectedIndex={selectedIndex}
          onSelect={handleSelect}
        />

        <AnimatePresence mode="wait">
          {selectedSkill && (
            <motion.article
              key={selectedSkill.name}
              className="skill-detail"
              style={
                {
                  "--detail-accent": selectedSkill.accent,
                } as React.CSSProperties
              }
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.99 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              aria-live="polite"
            >
              <div className="skill-detail__icon">
                {(() => {
                  const Icon = selectedSkill.icon;
                  return <Icon size={30} aria-hidden="true" />;
                })()}
              </div>

              <div className="skill-detail__content">
                <span className="skill-detail__eyebrow">
                  TECHNOLOGY SELECTED
                </span>

                <h3>{selectedSkill.name}</h3>

                <span className="skill-detail__category">
                  {skillCategories[selectedSkill.name] ?? "Development Tool"}
                </span>

                <p>
                  {skillDescriptions[selectedSkill.name] ??
                    `${selectedSkill.name} is part of my development toolkit for building digital experiences.`}
                </p>
              </div>

              <button
                type="button"
                className="skill-detail__close"
                aria-label="Close skill details"
                onClick={() => setSelectedIndex(null)}
              >
                ×
              </button>
            </motion.article>
          )}
        </AnimatePresence>

        <div className="skill-rubiks__status" aria-hidden="true">
          <span className="skill-rubiks__status-dot" />
          <span>9 skills placed · 3 more growing · drag to rotate</span>
        </div>
      </div>
    </section>
  );
}
