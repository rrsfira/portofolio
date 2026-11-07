"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUpRight, FolderOpen } from "lucide-react";
import { portfolioFolders } from "@/lib/portfolio-data";

function Folder({ folder, index }: { folder: (typeof portfolioFolders)[number]; index: number }) {
  const router = useRouter();
  const [opening, setOpening] = useState(false);
  const href = `/portfolio/${folder.slug}`;

  useEffect(() => {
    router.prefetch(href);
  }, [href, router]);

  const openFolder = () => {
    if (opening) return;
    setOpening(true);
    window.setTimeout(() => router.push(href), 220);
  };

  return (
    <motion.button
      type="button"
      className={`folder-card folder-card-${index + 1} ${opening ? "is-opening" : ""}`}
      onClick={openFolder}
      initial={{ opacity: 0, y: 90, rotateX: 16 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay: index * 0.13, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -12, scale: 1.025 }}
      whileTap={{ scale: 0.98 }}
      onPointerEnter={() => router.prefetch(href)}
      onFocus={() => router.prefetch(href)}
      style={{ "--folder-accent": folder.accent } as React.CSSProperties}
      aria-label={`Open ${folder.label} gallery`}
    >
      <span className="folder-tab" />
      <span className="folder-back" />
      <span className="folder-documents">
        {folder.documents.map((document, documentIndex) => (
          <span
            className="folder-document"
            key={document}
            style={{ "--document-index": documentIndex, backgroundImage: `url("${document}")` } as React.CSSProperties}
          />
        ))}
      </span>
      <span className="folder-front">
        <span className="folder-shine" />
        <span className="folder-meta">
          <strong>{folder.count}</strong>
          <small>{folder.label}</small>
        </span>
        <span className="folder-action"><FolderOpen size={19} /><ArrowUpRight size={14} /></span>
      </span>
      <span className="folder-index">0{index + 1}</span>
    </motion.button>
  );
}

export function FolderGallery() {
  return (
    <section className="folder-stage" aria-label="Portfolio folders">
      <div className="folder-intro">
        <span className="gallery-eyebrow">Selected work / 2026</span>
        <h1>Ideas, shaped<br /><em>into something real.</em></h1>
        <p>Explore a curated archive of interfaces, certificates, and milestones.</p>
      </div>
      <div className="folders-row">
        {portfolioFolders.map((folder, index) => <Folder key={folder.slug} folder={folder} index={index} />)}
      </div>
      <div className="stage-footnote"><span>Scroll to explore</span><span className="stage-line" /><span>Click a folder to open</span></div>
    </section>
  );
}
