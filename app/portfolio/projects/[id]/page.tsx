import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Github } from "lucide-react";
import { ExternalLink, PortfolioShell } from "@/components/PortfolioShell";
import { projectItems } from "@/lib/portfolio-data";

export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projectItems.find((item) => item.id === id);
  if (!project) notFound();
  return <PortfolioShell><article className="project-detail"><Link href="/portfolio/projects" className="detail-back"><ArrowLeft size={15} /> All projects</Link><div className="detail-grid"><div className="detail-image"><img src={project.image} alt="" /></div><div className="detail-copy"><span className="gallery-eyebrow">{project.year} / {project.organization}</span><h1>{project.title}</h1><p>{project.description}</p><div className="tech-list">{project.tech?.map((tech) => <span key={tech}>{tech}</span>)}</div>{project.source && <ExternalLink href={project.source}><Github size={14} /> View source on GitHub</ExternalLink>}</div></div></article></PortfolioShell>;
}
