"use client";

import { ArrowDown, ArrowRight, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { ProfileCard } from "@/components/ProfileCard";
import { profile } from "@/lib/data";

export function Hero() {
  return (
    <section
      id="home"
      className="section-shell grid min-h-screen items-center gap-10 pt-16 lg:grid-cols-[0.95fr_1.05fr]"
    >
      <motion.div
        initial={{ opacity: 0, y: 34 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl"
      >
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.34em] text-accent">
          Hello, I&apos;m
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {profile.name}
        </h1>
        <p className="mt-4 text-base text-white/78 sm:text-lg">{profile.role}</p>
        <p className="mt-5 max-w-xl text-sm leading-6 text-muted sm:text-base">
          {profile.bio}
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="focus-ring group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-black shadow-[0_0_45px_rgb(var(--accent)/0.28)] transition hover:scale-[1.02]"
          >
            View Projects
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </a>

          <a
            href="#contact"
            className="focus-ring inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/60 px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-accent/55 hover:text-accent"
          >
            <Mail className="h-4 w-4" />
            Contact Me
          </a>
        </div>

        <div className="mt-14 h-12 w-12" aria-hidden="true" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.92, x: 0, y: 30 }}
        animate={{ opacity: 1, scale: 1, x: 60, y: -70 }}
        transition={{
          type: "spring",
          stiffness: 90,
          damping: 17,
          delay: 0.18,
        }}
      >
        <ProfileCard />
      </motion.div>
    </section>
  );
}
