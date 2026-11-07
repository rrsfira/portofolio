"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GalleryHeading, PortfolioShell } from "@/components/PortfolioShell";
import { certificateItems } from "@/lib/portfolio-data";

function isPdf(path: string) {
  return path.toLowerCase().endsWith(".pdf");
}

export default function CertificatesGallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const item = selected === null ? null : certificateItems[selected];
  return <PortfolioShell><GalleryHeading eyebrow="02 / Certificates" title="Proof of the process." description="A collection of learning milestones that keep the craft moving forward." count={certificateItems.length} /><div className="certificate-grid">{certificateItems.map((certificate, index) => <motion.button type="button" className="certificate-tile" key={certificate.id} onClick={() => setSelected(index)} whileHover={{ y: -8 }}><span className="document-preview" style={isPdf(certificate.image) ? undefined : { backgroundImage: `url("${certificate.image}")` }}>{isPdf(certificate.image) ? <iframe title={`${certificate.title} preview`} src={certificate.image} /> : null}</span><span className="certificate-info"><strong>{certificate.title}</strong><small>{certificate.organization} · {certificate.year}</small></span></motion.button>)}</div><Lightbox item={item} index={selected} onClose={() => setSelected(null)} onNext={() => setSelected(((selected ?? 0) + 1) % certificateItems.length)} onPrevious={() => setSelected(((selected ?? 0) - 1 + certificateItems.length) % certificateItems.length)} /></PortfolioShell>;
}

function Lightbox({ item, index, onClose, onNext, onPrevious }: { item: typeof certificateItems[number] | null; index: number | null; onClose: () => void; onNext: () => void; onPrevious: () => void }) {
  return <AnimatePresence>{item && index !== null ? <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" onClick={onClose}><motion.div className="lightbox-content" initial={{ scale: 0.88, y: 18 }} animate={{ scale: 1, y: 0 }} onClick={(event) => event.stopPropagation()}><button type="button" className="lightbox-close" onClick={onClose} aria-label="Close preview"><X /></button><button type="button" className="lightbox-arrow left" onClick={onPrevious} aria-label="Previous certificate"><ChevronLeft /></button><div className="lightbox-image" style={isPdf(item.image) ? undefined : { backgroundImage: `url("${item.image}")` }}>{isPdf(item.image) ? <iframe title={`${item.title} full preview`} src={item.image} /> : null}</div><button type="button" className="lightbox-arrow right" onClick={onNext} aria-label="Next certificate"><ChevronRight /></button><div className="lightbox-caption"><strong>{item.title}</strong><span>{item.organization} · {item.year}</span></div></motion.div></motion.div> : null}</AnimatePresence>;
}
