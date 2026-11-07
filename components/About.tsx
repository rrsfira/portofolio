"use client";

import Image from "next/image";
import {
  Code2,
  GraduationCap,
  Laptop,
  MapPin,
  Trophy,
} from "lucide-react";
import { motion } from "framer-motion";

const statistics = [
  { value: "4+", label: "Experience", icon: Code2 },
  { value: "3.80 / 4.00", label: "GPA", icon: Trophy },
  { value: "Full Stack", label: "Developer", icon: Laptop },
  { value: "Surabaya, Indonesia", label: "Location", icon: MapPin },
];

export function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden py-16 text-white sm:py-20 lg:py-24"
    >
      <div
        className="pointer-events-none absolute -left-24 top-20 h-56 w-56 rounded-full bg-accent/[0.08] blur-2xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-[8%] top-12 h-2 w-2 rounded-full bg-accent shadow-[24px_36px_0_rgb(var(--accent)/0.28),52px_4px_0_rgb(var(--accent)/0.16)]"
        aria-hidden="true"
      />

      <div className="section-shell relative grid items-center gap-12 lg:grid-cols-[minmax(280px,0.78fr)_minmax(0,1.35fr)] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="relative mx-auto flex min-h-[360px] w-full max-w-[410px] items-end justify-center sm:min-h-[450px] lg:min-h-[520px]"
        >
          <div
            className="absolute bottom-4 h-[82%] w-[82%] rounded-full bg-accent/[0.09] sm:h-[86%] sm:w-[86%]"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-12 right-[7%] h-28 w-28 rounded-full border border-accent/25"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-[18%] left-[5%] h-3 w-3 rounded-full bg-accent"
            aria-hidden="true"
          />
          <Image
            src="/Graduation_Bouquet_Portrait_with_Railing-removebg-preview.png"
            alt="Shafira in her graduation attire"
            width={410}
            height={520}
            priority={false}
            className="relative z-10 h-auto max-h-[520px] w-full object-contain object-bottom drop-shadow-[0_18px_18px_rgba(0,0,0,0.32)]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
          className="min-w-0"
        >
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-8 bg-accent" />
            <p className="text-xs font-semibold tracking-[0.18em] text-accent">
              About Me
            </p>
          </div>

          <h2 className="max-w-2xl text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl">
            Turning Ideas into Impactful{" "}
            <span className="text-accent">Solutions</span>
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted sm:text-base">
            I am a Full Stack Web Developer with experience in developing web-based applications through academic projects and internship programs. I am proficient in developing both frontend and backend components using HTML, CSS, JavaScript, TypeScript, Tailwind CSS, React.js, Next.js, Node.js, Express.js, PHP, Laravel, MySQL, and REST APIs. My expertise includes designing user interfaces, managing databases, integrating APIs, as well as performing testing, debugging, and application deployment. I am passionate about learning new technologies, highly adaptable to different work environments, and experienced in collaborating within teams to apply problem-solving skills in the creation of functional, effective, and user-friendly digital solutions.
          </p>

          <div className="mt-5 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition-colors hover:border-accent/35 sm:p-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent ring-1 ring-accent/20">
              <GraduationCap size={24} strokeWidth={1.8} />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-white sm:text-base">
                Bachelor of Information Systems
              </h3>
              <p className="mt-1 text-xs text-white/60 sm:text-sm">
                UPN &quot;Veteran&quot; Jawa Timur
              </p>
              <p className="mt-0.5 text-xs text-white/40">2022 – 2026</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-white/10 pt-6 sm:gap-x-10 sm:gap-y-8">
            {statistics.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent ring-1 ring-accent/20">
                    <Icon size={20} strokeWidth={1.8} />
                  </div>
                  <div className="min-w-0">
                    <p className="whitespace-nowrap text-lg font-bold leading-tight sm:text-xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs text-white/50 sm:text-sm">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
