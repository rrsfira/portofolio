"use client";

import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import { SectionTitle } from "@/components/SectionTitle";
import { projects } from "@/lib/data";

export function Projects() {
  return (
    <section id="projects" className="section-shell py-24">
      <SectionTitle
        eyebrow="Projects"
        title="Selected work with a visual-first presentation."
      />
      <div className="grid gap-5 lg:grid-cols-12">
        {projects.map((project, index) => (
          <motion.article
            key={project.name}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: index * 0.06 }}
            className={`group overflow-hidden rounded-[8px] border border-white/10 bg-card/75 ${
              index === 0 ? "lg:col-span-7" : "lg:col-span-5"
            }`}
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-white/5">
              <img
                src={project.image}
                alt={`${project.name} project preview`}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <p className="absolute right-4 top-4 rounded-full border border-white/12 bg-black/45 px-3 py-1 text-xs text-white/70 backdrop-blur-md">
                {project.year}
              </p>
            </div>
            <div className="p-5 md:p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight text-white">{project.name}</h3>
                  <p className="mt-3 max-w-xl leading-7 text-muted">{project.description}</p>
                </div>
                <div className="flex gap-2">
                  <a href={project.live} className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white/65 transition hover:border-accent/50 hover:text-accent" aria-label={`${project.name} live demo`}>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <a href={project.source} className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white/65 transition hover:border-accent/50 hover:text-accent" aria-label={`${project.name} source code`}>
                    <Github className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span key={tech} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/58">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
