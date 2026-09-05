"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { SectionTitle } from "@/components/SectionTitle";
import { experiences } from "@/lib/data";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 35%"]
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <section id="experience" className="section-shell py-24">
      <SectionTitle eyebrow="Experience" title="Experience that shaped how I build." />
      <div ref={ref} className="relative">
        <div className="absolute left-3 top-0 h-full w-px bg-white/10 md:left-1/2" aria-hidden="true" />
        <motion.div
          className="absolute left-3 top-0 h-full w-px origin-top bg-accent shadow-[0_0_22px_rgb(var(--accent)/0.65)] md:left-1/2"
          style={{ scaleY }}
          aria-hidden="true"
        />
        <div className="grid gap-8">
          {experiences.map((item, index) => (
            <motion.article
              key={`${item.year}-${item.title}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -22 : 22 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`relative pl-10 md:w-[calc(50%-32px)] md:pl-0 ${
                index % 2 === 0 ? "md:mr-auto md:text-right" : "md:ml-auto"
              }`}
            >
              <span className="absolute left-[7px] top-2 h-3 w-3 rounded-full border border-accent bg-black shadow-[0_0_24px_rgb(var(--accent)/0.85)] md:left-auto md:right-[-39px]" />
              {index % 2 === 1 ? <span className="hidden md:absolute md:left-[-38px] md:top-2 md:block md:h-3 md:w-3 md:rounded-full md:border md:border-accent md:bg-black md:shadow-[0_0_24px_rgb(var(--accent)/0.85)]" /> : null}
              <div className="rounded-[8px] border border-white/10 bg-white/[0.035] p-5">
                <p className="text-sm font-semibold text-accent">{item.year}</p>
                <h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-white/58">{item.organization}</p>
                <p className="mt-4 leading-7 text-muted">{item.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
