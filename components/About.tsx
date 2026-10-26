
"use client";

import {
  ArrowUpRight,
  BookOpen,
  Code2,
  Lightbulb,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";

const principles = [
  {
    number: "01",
    title: "Learning",
    subtitle: "Build a strong foundation",
    description:
      "Learning through practice, exploration, and hands-on projects.",
    icon: BookOpen,
    color: "text-sky-400",
  },
  {
    number: "02",
    title: "Building",
    subtitle: "Turn ideas into reality",
    description:
      "Creating functional websites and interactive user experiences.",
    icon: Code2,
    color: "text-cyan-400",
  },
  {
    number: "03",
    title: "Exploring",
    subtitle: "Discover new possibilities",
    description:
      "Exploring frontend development, UI/UX design, and modern technologies.",
    icon: Lightbulb,
    color: "text-violet-400",
  },
  {
    number: "04",
    title: "Growing",
    subtitle: "Improve with every project",
    description:
      "Learning from every challenge and continuously refining my skills.",
    icon: TrendingUp,
    color: "text-emerald-400",
  },
];

export function About() {
  return (
    <section
      id="about"
      className="section-shell relative overflow-hidden py-14 sm:py-16 lg:py-20"
    >
      {/* Subtle ambient glow */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-cyan-500/[0.06] blur-[120px]" />

      <div className="relative grid items-start gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 xl:gap-20">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65 }}
          className="lg:pt-3"
        >
          {/* Section label */}
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-cyan-400" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-cyan-400">
              About me
            </p>
          </div>

          {/* Main heading */}
          <h2 className="max-w-xl text-[2.65rem] font-semibold leading-[1.06] tracking-[-0.045em] text-white sm:text-5xl lg:text-[3.5rem] xl:text-6xl">
            Learning.
            <br />
            Building.
            <br />
            <span className="accent-gradient">Becoming more.</span>
          </h2>

          {/* Description */}
          <p className="mt-6 max-w-md text-sm leading-7 text-white/60 sm:text-base sm:leading-7">
            I am a beginner developer passionate about creating simple,
            useful, and interactive web experiences. Every project is a
            chance to learn, experiment, and grow.
          </p>

          {/* Availability */}
          <div className="mt-8 flex max-w-md items-center gap-4 rounded-xl border border-white/[0.09] bg-white/[0.025] p-4 transition-colors duration-300 hover:border-cyan-400/20 hover:bg-white/[0.04]">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-cyan-400/15 bg-cyan-400/[0.08] text-cyan-300">
              <Sparkles size={19} strokeWidth={1.7} />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-semibold text-white sm:text-base">
                  Open to opportunities
                </h3>

                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
                  <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
                </span>
              </div>

              <p className="mt-1 text-xs leading-5 text-white/45 sm:text-sm">
                Ready to learn, collaborate, and create.
              </p>
            </div>
          </div>

          {/* Minimal signature */}
          <div className="mt-8 flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.2em] text-white/30">
              KEEP LEARNING
            </span>
            <span className="h-px w-8 bg-white/15" />
            <span className="font-mono text-[10px] tracking-[0.2em] text-cyan-400/60">
              KEEP BUILDING
            </span>
          </div>
        </motion.div>

        {/* Journey */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="min-w-0"
        >
          {/* Timeline heading */}
          <div className="mb-5 flex items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/35">
                My journey
              </p>

              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Growing through{" "}
                <span className="accent-gradient">experience.</span>
              </h3>
            </div>

            <span className="mb-1 shrink-0 font-mono text-xs text-white/30">
              01 / 04
            </span>
          </div>

          {/* Journey items */}
          <div className="relative">
            <div className="absolute bottom-8 left-[19px] top-8 w-px bg-gradient-to-b from-cyan-400/40 via-white/10 to-transparent" />

            <div className="space-y-1">
              {principles.map(
                (
                  { number, title, subtitle, description, icon: Icon, color },
                  index
                ) => (
                  <motion.div
                    key={number}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.08,
                    }}
                    className="group relative"
                  >
                    <div className="flex gap-4 rounded-xl border border-transparent px-3 py-4 transition-all duration-300 hover:border-white/[0.08] hover:bg-white/[0.025] sm:gap-5 sm:px-4 sm:py-[18px]">
                      {/* Timeline icon */}
                      <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.09] bg-[#0c1422] transition-all duration-300 group-hover:border-cyan-400/30 group-hover:bg-cyan-400/[0.08]">
                        <Icon
                          size={19}
                          strokeWidth={1.7}
                          className={`${color} transition-transform duration-300 group-hover:scale-110`}
                        />
                      </div>

                      {/* Text */}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <span className="font-mono text-[10px] tracking-wider text-cyan-400/70">
                            {number}
                          </span>

                          <span className="h-px w-4 bg-white/15" />

                          <p className="text-[11px] text-white/40">
                            {subtitle}
                          </p>
                        </div>

                        <div className="mt-1.5 flex items-center justify-between gap-3">
                          <h4 className="text-lg font-semibold text-white transition-colors duration-300 group-hover:text-cyan-300 sm:text-xl">
                            {title}
                          </h4>

                          <ArrowUpRight
                            size={17}
                            className="shrink-0 text-white/20 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-400"
                          />
                        </div>

                        <p className="mt-1.5 max-w-md text-xs leading-6 text-white/50 sm:text-sm sm:leading-6">
                          {description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              )}
            </div>
          </div>

          {/* Closing note */}
          <div className="mt-4 flex items-center gap-3 border-t border-white/[0.08] pt-4">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />

            <p className="text-xs leading-6 text-white/45 sm:text-sm">
              <span className="text-white/75">
                Progress over perfection.
              </span>{" "}
              One project at a time.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
