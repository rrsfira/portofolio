"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeSwitcher, themes } from "@/components/ThemeSwitcher";

export function PortfolioShell({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState(themes[0]);
  const [mode, setMode] = useState<"dark" | "light">("dark");

  useEffect(() => {
    document.documentElement.style.setProperty("--accent", theme.rgb);
    document.documentElement.style.setProperty("--accent-glow", theme.rgb);
    document.documentElement.dataset.theme = mode;
    document.documentElement.style.colorScheme = mode;
  }, [theme, mode]);

  return (
    <main className="portfolio-page min-h-screen overflow-hidden">
      <div className="portfolio-glow portfolio-glow-one" aria-hidden="true" />
      <div className="portfolio-glow portfolio-glow-two" aria-hidden="true" />
      <header className="portfolio-nav">
        <Link href="/portfolio" className="portfolio-brand" aria-label="Back to portfolio">
          Shafira<span>.</span>
        </Link>
        <Link href="/portfolio" className="portfolio-nav-back">
          <ArrowLeft size={14} /> Back
        </Link>
      </header>
      <ThemeSwitcher
        selected={theme}
        onChange={setTheme}
        mode={mode}
        onModeChange={setMode}
      />
      <motion.div
        className="portfolio-content"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </main>
  );
}

export function GalleryHeading({ eyebrow, title, description, count }: { eyebrow: string; title: string; description: string; count: number }) {
  return (
    <div className="gallery-heading">
      <span className="gallery-eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{description}</p>
      <span className="gallery-count">{String(count).padStart(2, "0")} selected pieces</span>
    </div>
  );
}

export function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <a className="portfolio-external-link" href={href} target="_blank" rel="noreferrer">{children}<ArrowUpRight size={14} /></a>;
}
