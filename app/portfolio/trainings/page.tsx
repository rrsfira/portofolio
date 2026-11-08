"use client";

import { useState } from "react";
import { BookOpen, X, ExternalLink } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { GalleryHeading, PortfolioShell } from "@/components/PortfolioShell";
import { trainingItems } from "@/lib/portfolio-data";

function isPdf(path: string) {
  return path.toLowerCase().endsWith(".pdf");
}

function getCoverPath(path: string) {
  return path.replace(/\.pdf$/i, "-cover.jpg");
}

export default function TrainingsGallery() {
  const [selected, setSelected] = useState<number | null>(null);
  return <PortfolioShell><GalleryHeading eyebrow="03 / Trainings" title="Always learning, always building." description="A collection of training programs and learning experiences that keep the craft moving forward." count={trainingItems.length} /><div className="training-grid">{trainingItems.map((training, index) => <motion.article className="training-tile" key={training.id} role="button" tabIndex={0} onClick={() => setSelected(index)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setSelected(index); } }} whileHover={{ y: -8 }}><span className="training-image" style={isPdf(training.image) ? undefined : { backgroundImage: `url("${training.image}")` }}>{isPdf(training.image) ? <><img className="training-cover" src={getCoverPath(training.image)} alt={`${training.title} cover`} /><span className="training-preview-overlay"><strong>{training.image.split("/").pop()}</strong><a className="document-open" href={training.image} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}>Buka file <ExternalLink size={14} /></a></span></> : null}</span><span className="training-copy"><BookOpen size={17} /><span><strong>{training.title}</strong><small>{training.organization} · {training.year}</small></span></span></motion.article>)}</div><AnimatePresence>{selected !== null ? <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}><div className="award-lightbox" onClick={(event) => event.stopPropagation()}><button type="button" className="lightbox-close" onClick={() => setSelected(null)} aria-label="Close preview"><X /></button><div className="award-large-image" style={isPdf(trainingItems[selected].image) ? undefined : { backgroundImage: `url("${trainingItems[selected].image}")` }}>{isPdf(trainingItems[selected].image) ? <><iframe title={`${trainingItems[selected].title} full preview`} src={trainingItems[selected].image} /><a className="document-open lightbox-open" href={trainingItems[selected].image} target="_blank" rel="noreferrer">Buka file <ExternalLink size={14} /></a></> : null}</div><h2>{trainingItems[selected].title}</h2><p>{trainingItems[selected].description}</p></div></motion.div> : null}</AnimatePresence></PortfolioShell>;
}
