"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "@/components/SectionTitle";
import { skills } from "@/lib/data";

export function Skills() {
  return (
    <section id="skills" className="section-shell py-24">
      <SectionTitle
        eyebrow="Skills"
        title="A versatile toolkit for building modern digital experiences."
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((skill, index) => {
          const Icon = skill.icon;
          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.045 }}
              className="group rounded-[8px] border border-white/10 bg-white/[0.035] p-5 transition hover:border-accent/45 hover:bg-accent/8 hover:shadow-glow"
            >
              <Icon className="mb-8 h-5 w-5 text-white/58 transition group-hover:-translate-y-1 group-hover:text-accent" />
              <p className="font-medium text-white">{skill.name}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
