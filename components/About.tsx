"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "@/components/SectionTitle";
import { profile } from "@/lib/data";

export function About() {
  return (
    <section id="about" className="section-shell py-24 md:py-32">
      <SectionTitle
        eyebrow="About"
        title="Interfaces with restraint, motion with intent."
        copy={profile.statement}
      />
      <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-[8px] p-6 md:p-8"
        >
          <p className="text-xl leading-9 text-white/86">
            I build portfolio sites, product surfaces, and design systems where performance,
            accessibility, and mood all matter. The goal is simple: make the first impression
            memorable, then make the second interaction useful.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="grid grid-cols-2 gap-4"
        >
          {[
            ["5+", "Years crafting web experiences"],
            ["38", "Launched interfaces"],
            ["12", "Design systems shipped"],
            ["A11y", "Included from day one"]
          ].map(([value, label]) => (
            <div key={value} className="rounded-[8px] border border-white/10 bg-white/[0.035] p-5">
              <p className="text-3xl font-semibold text-white">{value}</p>
              <p className="mt-2 text-sm leading-6 text-muted">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
