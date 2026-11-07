"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";
import { GalleryHeading, PortfolioShell, ExternalLink } from "@/components/PortfolioShell";
import { projectItems } from "@/lib/portfolio-data";

export default function ProjectsGallery() {
  return <PortfolioShell>
    <GalleryHeading eyebrow="01 / Projects" title="Built with intention." description="Digital products shaped around clarity, rhythm, and useful details." count={projectItems.length} />
    <div className="project-gallery">
      {projectItems.map((project, index) => <motion.article className="project-showcase" key={project.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}>
        <div className="project-image-wrap"><img src={project.image} alt="" /><span className="project-year">{project.year}</span></div>
        <div className="project-copy"><span className="project-kicker">{project.organization}</span><h2>{project.title}</h2><p>{project.description}</p><div className="tech-list">{project.tech?.map((tech) => <span key={tech}>{tech}</span>)}</div><div className="project-actions"><Link href={`/portfolio/projects/${project.id}`}>View details <ArrowRight size={15} /></Link>{project.source && <ExternalLink href={project.source}><Github size={14} /> GitHub</ExternalLink>}</div></div>
      </motion.article>)}
    </div>
  </PortfolioShell>;
}
