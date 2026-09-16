"use client";

import { ArrowUpRight, Award, BadgeCheck, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { SectionTitle } from "@/components/SectionTitle";

const certificationRoadmap = [
  {
    number: "01",
    title: "Web Development",
    description: "Strengthening practical skills across modern frontend and backend development.",
    icon: Award,
  },
  {
    number: "02",
    title: "UI/UX Design",
    description: "Building a stronger foundation in interface design, prototyping, and usability.",
    icon: BookOpen,
  },
  {
    number: "03",
    title: "Data & Systems",
    description: "Continuing to explore databases, APIs, analytics, and reliable system workflows.",
    icon: BadgeCheck,
  },
];

export function Certifications() {
  return (
    <section id="certifications" className="section-shell py-16 sm:py-20 lg:py-24">
      <SectionTitle
        eyebrow="Certifications"
        title="A growing record of skills, learning, and professional direction."
        copy="This space is ready for verified certificates and learning milestones as they are completed."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {certificationRoadmap.map(({ number, title, description, icon: Icon }, index) => (
          <motion.article
            key={title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: index * 0.08 }}
            className="group relative overflow-hidden rounded-[8px] border border-white/10 bg-white/[0.035] p-6 transition hover:-translate-y-1 hover:border-accent/45 hover:bg-accent/5"
          >
            <div className="absolute right-5 top-5 text-xs font-semibold tracking-[0.2em] text-white/30">
              {number}
            </div>
            <div className="grid h-12 w-12 place-items-center rounded-full bg-accent/10 text-accent ring-1 ring-accent/20">
              <Icon className="h-5 w-5" />
            </div>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Learning track
            </p>
            <h3 className="mt-3 text-xl font-semibold text-white">{title}</h3>
            <p className="mt-3 min-h-[72px] text-sm leading-6 text-white/62">{description}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/55">
              In progress
              <ArrowUpRight className="h-4 w-4 text-accent transition group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
