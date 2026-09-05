"use client";

import { BookOpen, Code2, Lightbulb, Sparkles, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const principles = [
  {
    number: "01",
    title: "Learning",
    description: "I am building my foundation through online resources, practice, and hands-on projects.",
    icon: BookOpen,
    tone: "from-blue-500/20 to-indigo-500/10"
  },
  {
    number: "02",
    title: "Building",
    description: "I enjoy turning ideas into real websites and interfaces to apply what I learn.",
    icon: Code2,
    tone: "from-cyan-500/20 to-blue-500/10"
  },
  {
    number: "03",
    title: "Exploring",
    description: "I am exploring frontend development, UI design, and modern web technologies.",
    icon: Lightbulb,
    tone: "from-sky-500/20 to-indigo-500/10"
  },
  {
    number: "04",
    title: "Growing",
    description: "Every project is a step forward. I am improving bit by bit, and excited for what is ahead.",
    icon: TrendingUp,
    tone: "from-violet-500/20 to-fuchsia-500/10"
  }
];

export function About() {
  return (
    <section id="about" className="section-shell py-24 md:py-32">
      <div className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-accent">About me</p>
          <h2 className="max-w-xl text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl">
            Learning by building, growing with every <span className="accent-gradient">project.</span>
          </h2>
          <p className="mt-7 max-w-lg text-base leading-8 text-white/65 md:text-lg">
            I am a beginner developer who enjoys turning ideas into simple, useful, and interactive
            web experiences. I am continuously learning, working on projects, and improving with
            every build.
          </p>

          <div className="mt-9 flex max-w-md items-center gap-4 rounded-[8px] border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-500/20 to-blue-500/20 text-violet-300 ring-1 ring-white/10">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-white">Open to opportunities</p>
              <p className="mt-1 text-sm leading-6 text-muted">I am excited to learn, collaborate, and contribute to real projects.</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {principles.map(({ number, title, description, icon: Icon, tone }) => (
            <div key={number} className="glass min-h-[258px] rounded-[8px] p-6 transition-transform duration-300 hover:-translate-y-1 md:p-7">
              <div className={`grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br ${tone} text-blue-400 ring-1 ring-white/5`}>
                <Icon className="h-7 w-7" strokeWidth={1.8} />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">{number}. {title}</h3>
              <p className="mt-3 max-w-xs text-sm leading-6 text-white/62">{description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
