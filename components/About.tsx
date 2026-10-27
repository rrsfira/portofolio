"use client";

import { Code2, Compass, Layers3, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const highlights = [
  {
    number: "01",
    icon: Code2,
    title: "Web Development",
    description:
      "Creating responsive websites with clean layouts and useful functionality.",
  },
  {
    number: "02",
    icon: Compass,
    title: "Continuous Learning",
    description:
      "Exploring new technologies and improving through hands-on projects.",
  },
  {
    number: "03",
    icon: Layers3,
    title: "Creative Thinking",
    description:
      "Combining design and technology to create better digital experiences.",
  },
];

export function About() {
  return (
    <section
      id="about"
      className="section-shell relative overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-cyan-500/[0.06] blur-[120px]" />

      <div className="relative grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-cyan-400" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-cyan-400">
              About me
            </p>
          </div>

          <h2 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            A little about{" "}
            <span className="accent-gradient">who I am.</span>
          </h2>

          <p className="mt-6 max-w-lg text-sm leading-7 text-white/60 sm:text-base">
            I am a web developer who enjoys exploring ideas, learning new
            technologies, and building digital experiences. I believe that
            every project is an opportunity to develop new skills and
            create something meaningful.
          </p>

          <div className="mt-8 flex items-center gap-4 rounded-xl border border-white/[0.09] bg-white/[0.025] p-4 transition-colors hover:border-cyan-400/25">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.08] text-cyan-300">
              <Sparkles size={20} strokeWidth={1.6} />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white">
                Open to opportunities
              </h3>
              <p className="mt-1 text-xs leading-5 text-white/45 sm:text-sm">
                Ready to learn, collaborate, and grow.
              </p>
            </div>

            <span className="ml-auto h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
          </div>

          <div className="mt-8 flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.2em] text-white/35">
              LEARN
            </span>
            <span className="h-px w-6 bg-white/20" />
            <span className="font-mono text-[10px] tracking-[0.2em] text-cyan-400/70">
              CREATE
            </span>
            <span className="h-px w-6 bg-white/20" />
            <span className="font-mono text-[10px] tracking-[0.2em] text-white/35">
              GROW
            </span>
          </div>
        </motion.div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="mb-5 border-b border-white/10 pb-4">
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/35">
              My approach
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
              What matters to me.
            </h3>
          </div>

          <div className="space-y-3">
            {highlights.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.number}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group rounded-xl border border-white/[0.08] bg-white/[0.025] p-5 transition-all duration-300 hover:border-cyan-400/25 hover:bg-white/[0.045] sm:p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#0c1422] text-cyan-300 transition-colors group-hover:border-cyan-400/30">
                      <Icon size={20} strokeWidth={1.7} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-[10px] tracking-wider text-cyan-400/70">
                        {item.number}
                      </p>

                      <h4 className="mt-1 text-base font-semibold text-white transition-colors group-hover:text-cyan-300 sm:text-lg">
                        {item.title}
                      </h4>

                      <p className="mt-2 text-xs leading-6 text-white/50 sm:text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <p className="mt-5 border-t border-white/[0.08] pt-4 text-xs leading-6 text-white/45 sm:text-sm">
            <span className="text-white/75">
              Progress over perfection.
            </span>{" "}
            One step at a time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
