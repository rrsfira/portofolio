"use client";

import { ArrowRight, Download } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ProfileCard } from "@/components/ProfileCard";
import { profile } from "@/lib/data";

const skills = [
  "Fullstack Web Developer",
  "UI/UX Designer",
  "Data Analyst",
];

export function Hero() {
  const [displayedSkill, setDisplayedSkill] = useState("");
  const [skillIndex, setSkillIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentSkill = skills[skillIndex];

    const typewriter = window.setTimeout(
      () => {
        if (!isDeleting) {
          const nextText = currentSkill.slice(0, displayedSkill.length + 1);
          setDisplayedSkill(nextText);

          if (nextText === currentSkill) {
            setIsDeleting(true);
          }
        } else {
          const nextText = currentSkill.slice(0, displayedSkill.length - 1);
          setDisplayedSkill(nextText);

          if (nextText === "") {
            setIsDeleting(false);
            setSkillIndex((prev) => (prev + 1) % skills.length);
          }
        }
      },
      !isDeleting && displayedSkill === currentSkill
        ? 1800
        : isDeleting
          ? 60
          : 100
    );

    return () => window.clearTimeout(typewriter);
  }, [displayedSkill, isDeleting, skillIndex]);

  return (
    <section
      id="home"
      className="section-shell flex min-h-0 flex-col gap-2 pb-10 pt-24 sm:min-h-[calc(100vh-7rem)] sm:gap-8 sm:pb-14 sm:pt-24 md:gap-10 md:pb-16 md:pt-28 lg:grid lg:grid-cols-[0.95fr_1.05fr] lg:pt-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 34 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="order-2 max-w-2xl lg:order-1"
      >
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.34em] text-accent">
          Hello, I&apos;m
        </p>

        <h1 className="min-h-[2.4em] max-w-full break-words text-3xl font-semibold leading-[1.08] tracking-tight text-white sm:min-h-[2.16em] sm:text-5xl lg:min-h-[2.16em] lg:text-6xl">
          {displayedSkill}
          <span
            className="ml-1 inline-block h-[0.9em] w-[3px] animate-pulse bg-accent align-[-0.08em]"
            aria-hidden="true"
          />
        </h1>

        <p className="mt-4 text-base text-white/78 sm:text-lg">
          {profile.name}
        </p>

        <p className="mt-5 max-w-xl text-sm leading-6 text-muted sm:text-base">
          {profile.bio}
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <a
            href="/CV%20Shafira%20TERBARU%202026.pdf"
            download="CV Shafira TERBARU 2026.pdf"
            className="focus-ring inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/60 px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-accent/55 hover:text-accent"
          >
            <Download className="h-4 w-4" />
            Download Resume
          </a>

          <a
            href="#projects"
            className="focus-ring group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-black shadow-[0_0_45px_rgb(var(--accent)/0.28)] transition hover:scale-[1.02]"
          >
            View Projects
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </a>
        </div>

        <div
          className="hidden h-12 w-12 sm:mt-14 sm:block"
          aria-hidden="true"
        />
      </motion.div>

      <div className="order-1 lg:order-2 lg:translate-x-[60px] lg:-translate-y-[140px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 90,
            damping: 17,
            delay: 0.18,
          }}
        >
          <ProfileCard />
        </motion.div>
      </div>
    </section>
  );
}